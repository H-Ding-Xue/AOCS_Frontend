<script lang="ts">
	import { writable } from 'svelte/store';
	import { Button } from '$lib/components/ui/button';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';
	import DataTableActions from './data-table-actions.svelte';
	import { onMount } from 'svelte';
	import * as Pagination from '$lib/components/ui/pagination';
	const tableData = writable([]);
	const table = createTable(tableData);
	let pageNumber: number | undefined = 1;
	const rowsPerPage: number = 10;
	onMount(async () => {
		try {
			const response = await fetch(
				'http://localhost:3000/api/pilots/' + pageNumber + '/' + rowsPerPage,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			if (!response.ok) {
				console.log(response.json.toString);
				throw new Error('Failed to fetch pilots');
			}
			const result = await response.json();
			$tableData = result;
		} catch (err) {
			// @ts-ignore
			console.error('Error:', err.message);
		}
	});

	async function onPageChanged(pageNumber: number | undefined) {
		try {
			const response = await fetch(
				'http://localhost:3000/api/pilots/' + pageNumber + '/' + rowsPerPage,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			if (!response.ok) {
				console.log(response.json.toString);
				throw new Error('Failed to fetch pilots');
			}
			const result = await response.json();
			$tableData = result;
		} catch (err) {
			// @ts-ignore
			console.error('Error:', err.message);
		}
	}

	const columns = table.createColumns([
		table.column({
			accessor: 'pilot_id',
			header: 'Pilot ID'
		}),
		table.column({
			accessor: 'pilot_first_name',
			header: 'Pilot First Name'
		}),
		table.column({
			accessor: 'pilot_last_name',
			header: 'Pilot Last Name'
		}),
		table.column({
			accessor: (pilot) => pilot,
			header: '',
			cell: ({ value }) => {
				return createRender(DataTableActions, { pilot: value });
			}
		})
	]);
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="r m">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

<Pagination.Root count={100} perPage={rowsPerPage} let:pages let:currentPage>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton on:click={() => onPageChanged(currentPage - 1)} />
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<Pagination.Item isVisible={currentPage == page.value}>
					<Pagination.Link
						{page}
						isActive={currentPage == page.value}
						on:click={() => onPageChanged(page.value)}
					>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}
		<Pagination.Item>
			<Pagination.NextButton on:click={() => onPageChanged(currentPage + 1)} />
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>

<Button on:click={() => console.log(pageNumber)}>Save changes</Button>
