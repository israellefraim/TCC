export type BookFormdata = {
  // Foreign Keys
  publisher_id: number;
  // Columns
  isbn: string;
  title: string;
  subtitle: string;
  edition: number;
  language: string;
  publication_year: number;
  stock_quantity: number;
  conditions: Record<string, number>;
};
