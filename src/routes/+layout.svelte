<script lang="ts">
	import '../app.css';
	import * as Menubar from "$lib/components/ui/menubar/index.js";
    import { Button } from "$lib/components/ui/button";
	import MenubarLabel from '$lib/components/ui/menubar/menubar-label.svelte';
</script>

<header>
	<Menubar.Root>
		<Menubar.Menu>
		  <Button href="/" variant = "link">HomePage</Button>
		</Menubar.Menu>
		<Menubar.Menu>
			<Button href="/readcsv" variant = "link">Load CSV</Button>
		</Menubar.Menu>
		<Menubar.Menu>
			<Button href="/searchsortwrite" variant = "link">View and Modify Data</Button>
		</Menubar.Menu>
		
		<Menubar.Menu>
			<div id="logo">
				<img src="shop.jpg" alt="" />
			</div>
		</Menubar.Menu>
	   </Menubar.Root>
</header>
<slot></slot> 
