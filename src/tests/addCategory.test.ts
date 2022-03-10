import { addCategory } from '$lib/dal/addCategory';
import { allCategories } from '$lib/stores/allCategories';
import { describe, expect, it, vi } from 'vitest';
import { get } from 'svelte/store';

describe('adding categories', () => {
	it('should add a category when called', async () => {
		const spy = vi.mock('$lib/stores/allCategories');
		await addCategory('test');
		const val = get(allCategories);
		expect(val.length).toBe(1);
		expect(val[0].name).toBe('test');
	});
});
