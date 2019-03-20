import tableData from './tableData';

class tableDataProvider {
    tableData = Object.assign({}, tableData);

    getData() {
        return this.tableData;
    }
}

export default new tableDataProvider();
