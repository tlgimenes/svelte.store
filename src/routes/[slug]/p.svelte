<script lang="ts">
  import ProductDetails from '$lib/components/ProductDetails/index.svelte';
	import type { GetProductQuery } from '$lib/server/types';

	export let product: GetProductQuery['product'];

</script>

<ProductDetails product={product} />
