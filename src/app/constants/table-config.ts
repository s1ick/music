// Убираем 'as const' и создаем нормальный тип
export const TABLE_CONFIG = {
  displayedColumns: ['id', 'title', 'fileName'],
  pageSizeOptions: [5, 10, 20],
  defaultPageSize: 10,
  searchDebounceTime: 300
};

export type DisplayedColumn = 'id' | 'title' | 'fileName';
