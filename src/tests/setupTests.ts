import { allCategories } from '$lib/stores/allCategories';
import { allCategoryRows } from '$lib/stores/allCategoryRows';
import { allElements } from '$lib/stores/allElements';
import { allMonths } from '$lib/stores/allMonths';
import { afterAll, afterEach, beforeEach } from 'vitest';

// Reset handlers after each test `important for test isolation`
beforeEach(() => {
	allCategories.set(undefined);
	allCategoryRows.set(undefined);
	allElements.set(undefined);
});
