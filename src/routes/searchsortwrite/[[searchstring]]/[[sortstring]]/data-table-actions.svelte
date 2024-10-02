<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { Pilot } from '../../../../Interface/Pilot';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	export let pilot: Pilot;

	async function deletePilot(pilotId: number) {
		try {
			const response = await fetch('http://localhost:3000/api/' + pilotId, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				console.log(response.json.toString);
				throw new Error('Failed to delete pilots');
			}

			alert('Deleted ' + pilotId);
			window.location.reload();
		} catch (err) {
			// @ts-ignore
			console.error('Error:', err.message);
		}
	}

	async function updatePilot(pilot: Pilot) {
		console.log(pilot);
		try {
			const response = await fetch('http://localhost:3000/api/pilot', {
				method: 'PUT',
				body: JSON.stringify(pilot),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				console.log(response.json.toString);
				throw new Error('Failed to delete pilots');
			}

			alert('Updated ' + pilot.pilot_id);
			window.location.reload();
		} catch (err) {
			// @ts-ignore
			console.error('Error:', err.message);
		}
	}
</script>

<!-- <Button on:click={() => console.log(pilot)}>Update</Button> -->

<Button on:click={() => deletePilot(pilot.pilot_id)}>Delete</Button>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Pilot</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit Pilot</Dialog.Title>
			<Dialog.Description>
				Make changes to your pilot here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="id" class="text-right">ID</Label>
				<Input id="id" disabled value={pilot.pilot_id} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="fname" class="text-right">First Name</Label>
				<Input id="fname" bind:value={pilot.pilot_first_name} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="lname" class="text-right">Last Name</Label>
				<Input id="lname" bind:value={pilot.pilot_last_name} class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={() => updatePilot(pilot)}>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
