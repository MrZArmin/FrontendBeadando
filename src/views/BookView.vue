<template>
  <div class="container mx-auto p-5">
    <div class="flex flex-wrap gap-2">
      <h1 class="text-3xl font-bold mt-8 mb-4">
        {{ id ? "Modify Book" : "Add Book" }}
      </h1>

      <Button
        label="Back"
        icon="pi pi-arrow-left"
        class="button secondary ml-auto mt-8"
        @click="router.push({ name: 'home' })"
      />
    </div>

    <form @submit.prevent="submitForm">
      <div class="flex flex-col gap-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700"
            >Title</label
          >
          <input
            type="text"
            id="title"
            v-model="form.title"
            class="mt-1 p-2 border rounded-lg w-full"
            required
          />
        </div>
        <div>
          <label for="author" class="block text-sm font-medium text-gray-700"
            >Author</label
          >
          <input
            type="text"
            id="author"
            v-model="form.author"
            class="mt-1 p-2 border rounded-lg w-full"
            required
          />
        </div>
        <div>
          <label for="isbn" class="block text-sm font-medium text-gray-700"
            >ISBN</label
          >
          <input
            type="text"
            id="isbn"
            v-model="form.isbn"
            class="mt-1 p-2 border rounded-lg w-full"
            required
          />
        </div>
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700"
            >Price (in dollars)</label
          >
          <input
            type="text"
            id="price"
            v-model="form.price"
            class="mt-1 p-2 border rounded-lg w-full"
            required
          />
        </div>
      </div>
      <div class="flex flex-wrap justify-between align-center">
        <Button
          @click="submitForm"
          class="mt-4 p-2 bg-blue-500 text-white rounded-lg"
          :label="id ? 'Modify book' : 'Add book'"
        />
        <Button
          @click="deleteBook(form.id)"
          class="mt-4 p-2 bg-red-500 text-white rounded-lg"
          label="Delete"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import type { Book } from "@/types";
import Button from "primevue/button";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const toast = useToast();

const router = useRouter();
const id = router.currentRoute.value.params.id;
const form = ref<Book>({
  id: "",
  title: "",
  author: "",
  isbn: "",
  price: "",
});

const submitForm = () => {
  if (!validate()) {
    return;
  }
  if (id) {
    // Update the book
    fetch(`http://localhost:3000/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form.value,
        price: `$${form.value.price}`,
      }),
    }).then(() => {
      router.push({ name: "home" });
    });
  } else {
    // Add the book
    fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form.value,
        price: `$${form.value.price}`,
      }),
    }).then(() => {
      router.push({ name: "home" });
    });
  }
};

const validate = () => {
  if (
    !form.value.title ||
    !form.value.author ||
    !form.value.isbn ||
    !form.value.price
  ) {
    toast.error("Please fill in all the fields");
    return false;
  }
  if (isNaN(Number(form.value.price))) {
    toast.error("Price must be a number");
    return false;
  }
  if (Number(form.value.price) < 0) {
    toast.error("Price must be a positive number");
    return false;
  }
  if (!validateISBN(form.value.isbn)) {
    toast.error("Invalid ISBN");
    return false;
  }

  return true;
};

const validateISBN = (isbn: string) => {
  let regex = new RegExp(
    /^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\d-]+$/
  );
  return regex.test(isbn);
};

const deleteBook = (id: string) => {
  fetch(`http://localhost:3000/books/${id}`, {
    method: "DELETE",
  }).then(() => {
    router.push({ name: "home" });
  });
};

onMounted(() => {
  if (id) {
    fetch(`http://localhost:3000/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        form.value = data;
      });
  }
});
</script>
