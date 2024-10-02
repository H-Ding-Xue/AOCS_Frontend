<script lang="ts">
	import { Pilot } from '../../Interface/Pilot';
	let files: any;
	async function handleClick() {
		if (files && files[0]) {
			let file = files[0];
			let read = new FileReader();
			read.readAsBinaryString(file);
			read.onloadend = function () {
				var dataForApi: Pilot[] = [];
				let content = read.result as string;
				let seperated: string[] = content.split('\n');
				seperated = seperated.filter(function (e) {
					return e !== '';
				});
				for (let i = 1; i < seperated.length; i++) {
					let pilotArray: string[] = seperated[i].slice(1).split(',');
					const pilot: Pilot = new Pilot(pilotArray[0], pilotArray[1].slice(0, -1));
					dataForApi.push(pilot);
				}
				sendCsvData(dataForApi);
			};
		} else {
			console.log('No file selected');
		}
	}

	async function sendCsvData(dataForApi: Pilot[]) {
		try {
			const response = await fetch('http://localhost:3000/api/pilot', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(dataForApi)
			});

			if (!response.ok) {
				console.log(response.json.toString);
				throw new Error('Failed to create pilots');
			}

			alert('Records added succesfully');

			window.location.reload();
		} catch (err) {
			// @ts-ignore
			console.error('Error:', err.message);
		}
	}
</script>

<div class="ml-2">
	<h2 class="text-4xl font-extrabold dark:text-white">Uploading of data file</h2>
	<br />
	<label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white" for="csv_file_input"
		>Data in csv format</label
	>
	<input
		bind:files
		class="w-600 mb-2 block cursor-pointer rounded border border-gray-300 bg-gray-50 text-sm text-gray-600 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
		type="file"
		accept="text/csv"
	/>
	<button
		on:click={handleClick}
		class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
		name="csv_file_button">Submit</button
	>
</div>
