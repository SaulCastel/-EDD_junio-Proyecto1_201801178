export default function bubbleSort(list) {
    let i, j;
    for (i = 0; i < list.len - 1; i++) {
        let node = list.head;
        for (j = 0; j < list.len - i - 1; j++) {
            if (node.data.purchases < node.next.data.purchases) {
                let temp = node.data;
                node.data = node.next.data;
                node.next.data = temp;
            }
            node = node.next;
        }
    }
    return list;
}