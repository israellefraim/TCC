import { supabase } from "../lib/supabase-client";

import type { BookFormdata } from "../types/BookFormData";

export async function createBook(bookData: BookFormdata) {
  const newBook = {
    // Foreign Keys
    publisher_id: bookData.publisher_id,
    // Columns
    isbn: bookData.isbn,
    title: bookData.title,
    subtitle: bookData.subtitle,
    edition: bookData.edition,
    language: bookData.language,
    publication_year: bookData.publication_year,
    stock_quantity: bookData.stock_quantity,
    conditions: bookData.conditions,
  };

  const { data, error } = await supabase
    .from("Books")
    .insert(newBook)
    .select("id")
    .single();

  if (error) {
    console.error("Erro ao cadastrar:", error);
    return;
  }

  const bookId = data.id;

  return;
}
