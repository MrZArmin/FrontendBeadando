<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { faker } from "@faker-js/faker";
import { ref, onMounted } from "vue";
import type { Book } from "./types";
import { useToast } from "vue-toast-notification";

const toast = useToast();

const books = ref<Book[]>([]);

const fetchBooks = async () => {
  try {
    // Fetch books from the JSON server
    const response = await fetch("http://localhost:3000/books");
    if (!response.ok) {
      throw new Error("Failed to fetch books from the server");
    }
    const data = await response.json();
    books.value = data;
  } catch (error) {
    // Notify the user about the error
    toast.error("Failed to fetch books from the server");
    toast.error("Are you sure the JSON server is running?");
    return;
  }
};

const postBooks = async () => {
  // Generate 50 fake books
  const fakeBooks: Book[] = Array.from(
    { length: 50 },
    () =>
      ({
        //id: faker.string.uuid(),
        title: faker.music.songName(),
        author: faker.person.fullName(),
        isbn: faker.commerce.isbn(),
        price: faker.commerce.price({
          min: 100,
          max: 200,
          dec: 0,
          symbol: "$",
        }),
      } as Book)
  );

  // Post the fake books to the JSON server
  await Promise.all(
    fakeBooks.map((book) =>
      fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      })
    )
  );
};

onMounted(async () => {
  await fetchBooks().then(() => {
    // If there are no books, post 100 fake books
    if (books.value.length === 0) {
      postBooks();
    }
  });
});
</script>
