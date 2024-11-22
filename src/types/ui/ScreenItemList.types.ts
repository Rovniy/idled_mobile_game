export type TItemListItem = {
	id: string,
	icon: string,
	name: string,
	description: string,
	count?: number,
}

export type TItemListProps = {
	list: TItemListItem[],
	withTemp?: boolean,
	actionText?: string,
	actionCallback?: (item: TItemListItem) => Promise<void> | undefined
}
