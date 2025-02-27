import { defineStore } from 'pinia';

export const useTablesStore = defineStore('tables', {
  state: () => ({
    tableData: [],
    infocodeVariants: [],
    schemaVariants: [],
    selectedSource: 'Записи',
    titleOrderBy: {
      field: 'infocode',
      orderBy: 'ASC',
    },
    infocodeOrderBy: {
      field: 'infocode_id',
      orderBy: 'ASC',
    },
    schemaOrderBy: {
      field: 'schema_id',
      orderBy: 'ASC',
    },
  }),
  actions: {
    setTableData(data) {
      this.tableData = data;
    },
    setInfoCodeVariants(data) {
      this.infocodeVariants = data;
    },
    setSchemaVariants(data) {
      this.schemaVariants = data;
    },
  },
});
