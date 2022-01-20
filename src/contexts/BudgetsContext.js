import React, { useContext } from "react"
import {v4 as uuidV4} from 'uuid'
import { useLocalStorage } from "../hooks/useLocalStorage"

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

// return usecontext hook to pass props 
export function useBudgets() {
    return useContext(BudgetsContext)
}

// take our budgets context and pass children
// all children has access to the value(budgets, expenses...)
export const BudgetsProvider = ({ children }) => {
    // use custom hook to save budgets and expenses in local storage
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    // function gets expenses for particular budget
    // returns only the expenses for the budgetId passed in(Ex: food ID)
    function getBudgetExpenses(budgetId){
        return expenses.filter(expenses => expenses.budgetId === budgetId)
    }

    // set expenses by returning previous expenses and add a new expense
    // create new id using uuid library, pass in description of expense,
    // amount of expense and the budgetId its from
    function addExpense({ description, amount, budgetId}){
        setExpenses(previousExpenses => {
            return [...previousExpenses, { id: uuidV4(), description, amount, budgetId}]
        })
    }

    /* 
     add budget works by returning previous budgets and adding a new one
     by creating a new id using uuid library, and passing name and max. 
     First check if in the previous budgets array to see if user is trying
     to create a new budget with the same name as a previous one. if found
     return previous budgets else create new one. 
    */ 
    function addBudget({ name, limit }){
        setBudgets(previousBudgets => {
            if (previousBudgets.find(budget => budget.name === name)) {
                return previousBudgets
            }
            return [...previousBudgets, { id: uuidV4(), name, limit}]
        })
    }

    /*
        delete budget function works by taking in id prop
        setting the budgets state to all the previous budgets
        except it filters through the previous budgets and excludes
        the previous budget that matches the passed id. as well as takes 
        all previous expenses from that deleted budget and moves them to 
        uncategorized. does this by mapping over previous expenses
        and if the expense budget id does not match the deleted budget id
        then return otherwise return the expenses with a new budget id of
        uncategorized. 
    */
    function deleteBudget({ id }){
        setExpenses(previousExpenses => {
            return previousExpenses.map(expense => {
                if (expense.budgetId !== id) return expense
                return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
            })
        })

        setBudgets(previousBudgets => {
            return previousBudgets.filter(budget => budget.id !== id)
        })
    }

    // delete expenses function works the same as delete budget
    function deleteExpense({ id }){
        setExpenses(previousExpenses => {
            return previousExpenses.filter(expenses => expenses.id !== id)
        })
    }



    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>
        {children}
    </BudgetsContext.Provider>
}