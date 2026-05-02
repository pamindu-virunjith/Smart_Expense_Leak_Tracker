import { groupByCategory } from "./groupByCategory.js";

export function getMonthlyCategoryStatus(current,last){
    const currentTotals = groupByCategory(current);
    const lastTotals = groupByCategory(last);

    const allCategories = new Set([
        ...Object.keys(currentTotals),
        ...Object.keys(lastTotals)
    ]);

    const comparison = [];

    allCategories.forEach((category)=>{
        const currentMonth = currentTotals[category] || 0;
        const lastMonth = lastTotals[category] || 0;
        let change = 0;

        if(lastMonth === 0){
            change = currentMonth > 0 ? 100 : 0
        }else{
            change = (((currentMonth - lastMonth)/ lastMonth)*100).toFixed(1)
        }

        comparison.push({
            category,
            currentMonth,
            lastMonth,
            change
        })
    })

    return comparison
}
