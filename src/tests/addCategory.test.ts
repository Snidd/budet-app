import { addCategory } from '$lib/dal/addCategory';
import { allCategories } from '$lib/stores/allCategories';
import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';

describe('adding categories', () => {
	it('should add a category when called', async () => {
		await addCategory('test');
		const val = get(allCategories);
		expect(val.length).toBe(1);
		expect(val[0].name).toBe('test');
	});
});
