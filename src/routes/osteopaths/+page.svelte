<script lang="ts">
    import { osteopaths } from "./data"
</script>

<main class="max-w-screen-2xl w-full">
    <h1 class="text-3xl font-bold mb-4">Osteopaths</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {#each osteopaths as osteopath}
            <a href='osteopaths/{osteopath.id}' class="flex rounded-lg border hover:bg-secondary/50 p-4 gap-x-4">
                <img class="size-24 rounded-full" src={osteopath.image} alt="Anisha Profile Pic" />
                <div class="flex flex-col p-1 gap-y-1">
                    <h2 class="text-xl font-bold">{osteopath.name}</h2>
                    <p class="">{osteopath.short_bio}</p>
                </div>
            </a>
        {/each}
    </div>
</main>