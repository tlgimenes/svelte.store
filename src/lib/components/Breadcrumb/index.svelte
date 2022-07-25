<script lang="ts">
	import type { Breadcrumb_BreadcrumbListFragment } from '$lib/server/autogen';

	export let breadcrumbList: Breadcrumb_BreadcrumbListFragment;

	const current = breadcrumbList.itemListElement[breadcrumbList.itemListElement.length - 1];
	const items = breadcrumbList.itemListElement.slice(0, breadcrumbList.itemListElement.length - 1);
</script>

<nav aria-label="Breadcrumb">
	<ol class="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
		{#each items as item}
			<li>
				<div class="flex items-center">
					<a href={item.item} class="mr-2 text-sm font-medium text-gray-900"> {item.name} </a>
					<svg
						width="16"
						height="20"
						viewBox="0 0 16 20"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						class="w-4 h-5 text-gray-300"
					>
						<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
					</svg>
				</div>
			</li>
		{/each}

		<li class="text-sm">
			<a
				href={current.item}
				aria-current="page"
				class="font-medium text-gray-500 hover:text-gray-600"
			>
				{current.name}
			</a>
		</li>
	</ol>
</nav>
