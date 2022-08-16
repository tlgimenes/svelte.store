<script lang="ts">
	import ProductDetails from '$lib/components/ProductDetails/index.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<ProductDetails product={data.product} />
