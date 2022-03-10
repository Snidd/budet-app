import { addCategory } from '$lib/dal/addCategory';
import { describe, expect, it, vi } from 'vitest';

describe('adding categories', () => {
	it('should add a category when called', async () => {
		const spy = vi.mock('allCategories');
		await addCategory('test');
		expect(spy).toHaveBeenCalledOnce();
	});
});
