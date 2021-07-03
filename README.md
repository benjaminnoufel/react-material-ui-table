# react-material-ui-table

Create table with Material-ui Table for React.

![Code Style CI](https://github.com/benjaminnoufel/react-material-ui-table/workflows/Code%20Style%20CI/badge.svg)
![Test CI](https://github.com/benjaminnoufel/react-material-ui-table/workflows/Test%20CI/badge.svg)
![Build CI](https://github.com/benjaminnoufel/react-material-ui-table/workflows/Build%20CI/badge.svg)
![Package](https://github.com/benjaminnoufel/react-material-ui-table/workflows/Package/badge.svg)

## Requirements

- [Node](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Yarn](https://yarnpkg.com/) (instead of NPM)

## Installation

### NPM

```console
$ npm install @material-ui/core react@16 @benjaminnoufel/react-material-ui-table
```

### Yarn

```console
$ yarn add @material-ui/core react@16 @benjaminnoufel/react-material-ui-table
```

## Usage

### Use ReactMaterialUiTable without additionnalColumns
```tsx
import ReactMaterialUiTable from "@benjaminnoufel/react-material-ui-table"
import React from "react";

const App = () => {
    const head = {
        name: "Name",
        description: "Description",
        reference: "Reference"
    }
    const headers = Object.keys(head).reduce((allHeaders, header) => ({...allHeaders, [header]: translate(header, lang)}), {})
    const rows = [
        {
            name: "Product 1",
            description: "Description of product one",
            reference: "P-252-98"
        },
        {
            name: "Product 2",
            description: "Description of product two",
            reference: "P-252-99"
        }
    ]   
    return (
        <>
            <ReactMaterialUiTable
                headers={headers}
                hiddenColumns={["__v", "label"]}
                rows={rows}
            />
        </>
    );   
}

```

### Use ReactMaterialUiTable with additionnalColumns
```tsx
import ReactMaterialUiTable from "@benjaminnoufel/react-material-ui-table"
import React from "react";

const App = () => {
    const head = {
        name: "Name",
        description: "Description",
        reference: "Reference"
    }
    const headers = Object.keys(head).reduce((allHeaders, header) => ({...allHeaders, [header]: translate(header, lang)}), {})
    const rows = [
        {
            name: "Product 1",
            description: "Description of product one",
            reference: "P-252-98"
        },
        {
            name: "Product 2",
            description: "Description of product two",
            reference: "P-252-99"
        }
    ]   
    return (

        <>
            <ReactMaterialUiTable
                headers={headers}
                hiddenColumns={["__v", "label"]}
                rows={entities}
                additionnalColumns={[(id: any) => <button onClick={() => alert(`id = ${id}`)}>Click on me</button>]}
            />
        </>
    );   
}

```

### API

```ts
type AdditionnalColumn = (id: any) => JSX.Element;

interface ReactMaterialUiTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    headers: Record<string, string>;
    rows: Array<Record<string, any>>;
    labelRowsPerPage?: string;
    backIconButtonText?: string;
    nextIconButtonText?: string;
    showSearch?: boolean;
    hiddenColumns?: string[];
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
    additionnalColumnsId?: string;
    additionnalColumnsLabel?: string;
    additionnalColumns?: Array<AdditionnalColumn>;
}
```

## License

See [`LICENSE`](./LICENSE).

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md).

## Contributions

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).
