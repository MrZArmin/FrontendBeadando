<template>
  <div class="home bg-gradient-to-r from-red-200 to-indigo-600">
    <div class="flex flex-wrap gap-2 p-5">
      <h1 class="text-3xl font-bold mt-8 mb-4">Books</h1>

      <Button
        label="Add new book"
        icon="pi pi-plus"
        class="button ml-auto mt-8"
        @click="router.push({ name: 'book' })"
      />
    </div>

    <DataTable
      :value="filteredBooks"
      paginator
      :rows="10"
      selectionMode="single"
      dataKey="id"
      :metaKeySelection="false"
      stripedRows
      @rowSelect="openBook"
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl text-surface-900 dark:text-surface-0 font-bold"
            >Books</span
          >
          <div class="flex gap-1">
            <div class="relative">
              <InputText
                v-model="searchTerm"
                placeholder="Search term"
                class="h-fullmt-1 p-2 border rounded-lg w-40"
              />
            </div>
            <div class="relative">
              <Dropdown
                v-model="searchCategory"
                :options="[
                  { label: 'Title', value: 'title' },
                  { label: 'Author', value: 'author' },
                  { label: 'ISBN', value: 'isbn' },
                  { label: 'Price', value: 'price' },
                ]"
                optionLabel="label"
              />
            </div>
          </div>
        </div>
      </template>
      <Column field="title" header="Title"></Column>
      <Column field="author" header="Author"></Column>
      <Column field="isbn" header="ISBN"></Column>
      <Column field="price" header="Price"></Column>
      <template #empty>
        <div class="flex justify-center mt-4">
          <p class="text-xl text-surface-900 dark:text-surface-0">No books found.</p>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import type { Book } from "@/types";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

const books = ref<Book[]>([]);

const router = useRouter();

const searchTerm = ref("");
const searchCategory = ref({ label: "Title", value: "title" });

const fetchBooks = async () => {
  const response = await fetch("http://localhost:3000/books");
  const data = await response.json();
  books.value = data;
};

const filteredBooks = computed(() => {
  return books.value.filter((book) => {
    return book[searchCategory.value.value]
      .toString()
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
  });
});

const openBook = (event: { data: { id: any } }) => {
  router.push({ name: "book", params: { id: event.data.id } });
};

onMounted(fetchBooks);
</script>
