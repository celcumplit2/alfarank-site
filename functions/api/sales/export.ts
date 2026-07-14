import {
  canSeeAll,
  ownerCondition,
  requireSalesUser,
  textResponse,
  todayParam,
  type SalesEnv,
  type SalesUser
} from "./_shared";

type XlsxCell = string | number | null | undefined;
type XlsxSheet = {
  name: string;
  rows: XlsxCell[][];
};

type ZipEntry = {
  path: string;
  bytes: Uint8Array;
  crc: number;
};

function xmlEscape(value: XlsxCell): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function columnName(index: number): string {
  let value = index + 1;
  let name = "";
  while (value > 0) {
    const remainder = (value - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    value = Math.floor((value - 1) / 26);
  }
  return name;
}

function sheetXml(rows: XlsxCell[][]): string {
  const body = rows
    .map((row, rowIndex) => {
      const cells = row
        .map((cell, columnIndex) => {
          const ref = `${columnName(columnIndex)}${rowIndex + 1}`;
          if (typeof cell === "number" && Number.isFinite(cell)) {
            return `<c r="${ref}"><v>${cell}</v></c>`;
          }
          return `<c r="${ref}" t="inlineStr"><is><t>${xmlEscape(cell)}</t></is></c>`;
        })
        .join("");
      return `<row r="${rowIndex + 1}">${cells}</row>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetViews><sheetView workbookViewId="0"/></sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  <sheetData>${body}</sheetData>
</worksheet>`;
}

function workbookXml(sheets: XlsxSheet[]): string {
  const sheetNodes = sheets
    .map(
      (sheet, index) =>
        `<sheet name="${xmlEscape(sheet.name).slice(0, 31)}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>${sheetNodes}</sheets>
</workbook>`;
}

function workbookRelsXml(sheets: XlsxSheet[]): string {
  const sheetRels = sheets
    .map(
      (_sheet, index) =>
        `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${sheetRels}
  <Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
}

function contentTypesXml(sheets: XlsxSheet[]): string {
  const sheetOverrides = sheets
    .map(
      (_sheet, index) =>
        `<Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  ${sheetOverrides}
</Types>`;
}

function rootRelsXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;
}

function stylesXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts>
  <fills count="1"><fill><patternFill patternType="none"/></fill></fills>
  <borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
}

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function writeUint16(bytes: Uint8Array, offset: number, value: number): void {
  bytes[offset] = value & 0xff;
  bytes[offset + 1] = (value >>> 8) & 0xff;
}

function writeUint32(bytes: Uint8Array, offset: number, value: number): void {
  bytes[offset] = value & 0xff;
  bytes[offset + 1] = (value >>> 8) & 0xff;
  bytes[offset + 2] = (value >>> 16) & 0xff;
  bytes[offset + 3] = (value >>> 24) & 0xff;
}

function concat(parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const output = new Uint8Array(total);
  let offset = 0;
  parts.forEach((part) => {
    output.set(part, offset);
    offset += part.length;
  });
  return output;
}

function encode(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function localHeader(entry: ZipEntry, nameBytes: Uint8Array): Uint8Array {
  const header = new Uint8Array(30 + nameBytes.length);
  writeUint32(header, 0, 0x04034b50);
  writeUint16(header, 4, 20);
  writeUint16(header, 6, 0x0800);
  writeUint16(header, 8, 0);
  writeUint16(header, 10, 0);
  writeUint16(header, 12, 0);
  writeUint32(header, 14, entry.crc);
  writeUint32(header, 18, entry.bytes.length);
  writeUint32(header, 22, entry.bytes.length);
  writeUint16(header, 26, nameBytes.length);
  writeUint16(header, 28, 0);
  header.set(nameBytes, 30);
  return header;
}

function centralHeader(entry: ZipEntry, nameBytes: Uint8Array, offset: number): Uint8Array {
  const header = new Uint8Array(46 + nameBytes.length);
  writeUint32(header, 0, 0x02014b50);
  writeUint16(header, 4, 20);
  writeUint16(header, 6, 20);
  writeUint16(header, 8, 0x0800);
  writeUint16(header, 10, 0);
  writeUint16(header, 12, 0);
  writeUint16(header, 14, 0);
  writeUint32(header, 16, entry.crc);
  writeUint32(header, 20, entry.bytes.length);
  writeUint32(header, 24, entry.bytes.length);
  writeUint16(header, 28, nameBytes.length);
  writeUint16(header, 30, 0);
  writeUint16(header, 32, 0);
  writeUint16(header, 34, 0);
  writeUint16(header, 36, 0);
  writeUint32(header, 38, 0);
  writeUint32(header, 42, offset);
  header.set(nameBytes, 46);
  return header;
}

function endCentralDirectory(entryCount: number, centralSize: number, centralOffset: number): Uint8Array {
  const header = new Uint8Array(22);
  writeUint32(header, 0, 0x06054b50);
  writeUint16(header, 4, 0);
  writeUint16(header, 6, 0);
  writeUint16(header, 8, entryCount);
  writeUint16(header, 10, entryCount);
  writeUint32(header, 12, centralSize);
  writeUint32(header, 16, centralOffset);
  writeUint16(header, 20, 0);
  return header;
}

function zip(entries: { path: string; content: string }[]): Uint8Array {
  const prepared = entries.map((entry) => {
    const bytes = encode(entry.content);
    return {
      path: entry.path,
      bytes,
      crc: crc32(bytes)
    };
  });

  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;

  prepared.forEach((entry) => {
    const nameBytes = encode(entry.path);
    const local = localHeader(entry, nameBytes);
    localParts.push(local, entry.bytes);
    centralParts.push(centralHeader(entry, nameBytes, offset));
    offset += local.length + entry.bytes.length;
  });

  const centralOffset = offset;
  const central = concat(centralParts);
  const end = endCentralDirectory(prepared.length, central.length, centralOffset);
  return concat([...localParts, central, end]);
}

function xlsxBytes(sheets: XlsxSheet[]): Uint8Array {
  const entries = [
    { path: "[Content_Types].xml", content: contentTypesXml(sheets) },
    { path: "_rels/.rels", content: rootRelsXml() },
    { path: "xl/workbook.xml", content: workbookXml(sheets) },
    { path: "xl/_rels/workbook.xml.rels", content: workbookRelsXml(sheets) },
    { path: "xl/styles.xml", content: stylesXml() },
    ...sheets.map((sheet, index) => ({
      path: `xl/worksheets/sheet${index + 1}.xml`,
      content: sheetXml(sheet.rows)
    }))
  ];
  return zip(entries);
}

async function allRows<T extends Record<string, unknown>>(env: SalesEnv, sql: string, bindings: unknown[] = []): Promise<T[]> {
  const statement = env.DB.prepare(sql);
  const result = bindings.length ? await statement.bind(...bindings).all<T>() : await statement.all<T>();
  return result.results || [];
}

function scopedSql(user: SalesUser, alias: string): { condition: string; bindings: unknown[] } {
  const scope = ownerCondition(user, alias);
  return {
    condition: scope.sql ? `WHERE ${scope.sql}` : "",
    bindings: scope.bindings
  };
}

function rowsFromObjects(headers: string[], rows: Record<string, unknown>[]): XlsxCell[][] {
  return [
    headers,
    ...rows.map((row) => headers.map((header) => row[header] as XlsxCell))
  ];
}

export const onRequestGet: PagesFunction<SalesEnv> = async ({ request, env }) => {
  const userOrResponse = await requireSalesUser(request, env);
  if (userOrResponse instanceof Response) return userOrResponse;

  const user = userOrResponse;
  const today = todayParam(request);
  const clientsScope = scopedSql(user, "c");
  const actionsScope = scopedSql(user, "a");
  const managerWhere = canSeeAll(user) ? "" : "WHERE manager_id = ?";
  const managerBindings = canSeeAll(user) ? [] : [user.id];

  const [metrics, clients, actions, weekly, audit] = await Promise.all([
    allRows(
      env,
      `SELECT
        ? AS today,
        (SELECT COUNT(*) FROM sales_clients c ${clientsScope.condition}) AS companies_count,
        (SELECT COUNT(*) FROM sales_clients c ${clientsScope.condition} ${clientsScope.condition ? "AND" : "WHERE"} c.status = 'Клиент') AS clients_count,
        (SELECT COUNT(*) FROM sales_actions a ${actionsScope.condition} ${actionsScope.condition ? "AND" : "WHERE"} a.action_type = 'Встреча') AS meetings_count,
        (SELECT COUNT(*) FROM sales_actions a ${actionsScope.condition} ${actionsScope.condition ? "AND" : "WHERE"} a.action_type = 'КП отправлено') AS proposals_count,
        (SELECT COUNT(*) FROM sales_actions a ${actionsScope.condition} ${actionsScope.condition ? "AND" : "WHERE"} a.action_date < ? AND a.status <> 'Сделано') AS overdue_count,
        (SELECT COUNT(*) FROM sales_actions a ${actionsScope.condition} ${actionsScope.condition ? "AND" : "WHERE"} a.action_date = ? AND a.status <> 'Сделано') AS today_count`,
      [
        today,
        ...clientsScope.bindings,
        ...clientsScope.bindings,
        ...actionsScope.bindings,
        ...actionsScope.bindings,
        ...actionsScope.bindings,
        today,
        ...actionsScope.bindings,
        today
      ]
    ),
    allRows(
      env,
      `SELECT
        id,
        company_name,
        segment,
        website,
        city,
        contact_name,
        contact_role,
        contact_details,
        source,
        source_details,
        last_contact_at,
        status,
        next_action,
        next_action_at,
        potential,
        comment,
        owner_id,
        created_at,
        updated_at
      FROM sales_clients c
      ${clientsScope.condition}
      ORDER BY company_name ASC`,
      clientsScope.bindings
    ),
    allRows(
      env,
      `SELECT
        id,
        action_date,
        client_id,
        company_name,
        contact_name,
        priority,
        action_type,
        task,
        result,
        status,
        next_step,
        next_step_date,
        help_required,
        solution_options,
        owner_id,
        completed_at,
        created_at,
        updated_at
      FROM sales_actions a
      ${actionsScope.condition}
      ORDER BY action_date ASC, company_name ASC`,
      actionsScope.bindings
    ),
    allRows(
      env,
      `SELECT
        id,
        week_start,
        manager_id,
        manager_comment,
        director_comment,
        created_at,
        updated_at
      FROM sales_weekly_reviews
      ${managerWhere}
      ORDER BY week_start ASC`,
      managerBindings
    ),
    allRows(
      env,
      `SELECT
        id,
        entity_type,
        entity_id,
        action,
        actor_id,
        before_json,
        after_json,
        created_at
      FROM sales_audit_log
      ORDER BY created_at DESC
      LIMIT 500`
    )
  ]);

  const sheets: XlsxSheet[] = [
    {
      name: "Панель",
      rows: rowsFromObjects(
        ["today", "companies_count", "clients_count", "meetings_count", "proposals_count", "overdue_count", "today_count"],
        metrics
      )
    },
    {
      name: "Клиенты",
      rows: rowsFromObjects(
        [
          "id",
          "company_name",
          "segment",
          "website",
          "city",
          "contact_name",
          "contact_role",
          "contact_details",
          "source",
          "source_details",
          "last_contact_at",
          "status",
          "next_action",
          "next_action_at",
          "potential",
          "comment",
          "owner_id",
          "created_at",
          "updated_at"
        ],
        clients
      )
    },
    {
      name: "Действия",
      rows: rowsFromObjects(
        [
          "id",
          "action_date",
          "client_id",
          "company_name",
          "contact_name",
          "priority",
          "action_type",
          "task",
          "result",
          "status",
          "next_step",
          "next_step_date",
          "help_required",
          "solution_options",
          "owner_id",
          "completed_at",
          "created_at",
          "updated_at"
        ],
        actions
      )
    },
    {
      name: "Итоги недели",
      rows: rowsFromObjects(
        ["id", "week_start", "manager_id", "manager_comment", "director_comment", "created_at", "updated_at"],
        weekly
      )
    },
    {
      name: "История",
      rows: rowsFromObjects(
        ["id", "entity_type", "entity_id", "action", "actor_id", "before_json", "after_json", "created_at"],
        audit
      )
    }
  ];

  try {
    const bytes = xlsxBytes(sheets);
    const stamp = new Date().toISOString().slice(0, 10);
    const body = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(body).set(bytes);
    return new Response(body, {
      status: 200,
      headers: {
        "content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "content-disposition": `attachment; filename="alfarank-sales-${stamp}.xlsx"`,
        "cache-control": "no-store"
      }
    });
  } catch (error) {
    console.error("Failed to build sales XLSX export", error);
    return textResponse("Could not build XLSX export.", 500);
  }
};

export const onRequestPost: PagesFunction = async () =>
  textResponse("Method not allowed.", 405);
