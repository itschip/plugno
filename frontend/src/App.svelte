<script lang="ts">
  import { pocketBaseClient } from "./lib/pocketbase";

    const handleAuth = async () => {
        await pocketBaseClient.users.create({
            email: "test@user.com",
            password: "12345678",
            passwordConfirm: "12345678"
        })
    }
</script>

<main>
    <button on:click={handleAuth}>Create user</button>
</main>

<style>
</style>
