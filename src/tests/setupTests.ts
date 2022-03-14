import { allCategories } from '$lib/stores/allCategories';
import { allCategoryRows } from '$lib/stores/allCategoryRows';
import { allElements } from '$lib/stores/allElements';
import { allMonths } from '$lib/stores/allMonths';
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';

beforeAll(() => {
	vi.mock('$lib/fetchApi');
});

// Reset handlers after each test `important for test isolation`
beforeEach(() => {
	allCategories.set(undefined);
	allCategoryRows.set(undefined);
	allElements.set(undefined);
	allMonths.set(undefined);
});
