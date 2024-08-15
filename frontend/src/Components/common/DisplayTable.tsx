import { Table } from "react-bootstrap";

type Headers = { [key: string]: string }
type Rows = { [key: string]: any }[]

interface DisplayTableProps {
  headers: Headers;
  rows: Rows;
}

export function DisplayTable({ headers, rows}: DisplayTableProps ) {
  const headerKeys = Object.keys(headers)
  return(
    <Table striped hover>
      <thead>
        <tr>
          {
            headerKeys.map((headerKey) => (
              <td key={headerKey}>{headers[headerKey]}</td>
            ))
          }
        </tr>
      </thead>
      <tbody>
          {
            rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {
                  headerKeys.map((key) => (
                    <td key={rowIndex + key}>{row[key]}</td>
                  ))
                }
              </tr>
            ))
          }
      </tbody>
    </Table>
  );
}