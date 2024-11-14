import type { DebtModel } from '@/features/Debts/debt.interface'
import { defaultDebt } from '@/features/Debts/default.debt'
import { useAuthStore } from '@/stores/auth.store'
import { useDebtStore } from '@/stores/debt.store'
import { database } from '@/api/client'
import { Query } from 'appwrite'

class DebtService {
  constructor() {
    this.db = 'debts'
    this.collection = 'debts-collection'
  }

  stripUnnecessaryFields = <T>(input: never, model: T): T => {
    const allowedFields = Object.keys(model) as Array<keyof T>
    const result: Partial<T> = {}

    allowedFields.forEach((key) => {
      if (input[key] !== undefined) {
        result[key] = input[key]
      }
    })

    return result as T
  }

  async addDebt(debt: DebtModel) {
    let error = null

    try {
      return await database.createDocument(this.db, this.collection, 'unique()', debt)
    } catch (err) {
      error = err
      console.log(err)
    }

    return {
      error
    }
  }

  async getDebtById(id) {
    try {
      return await database.getDocument(this.db, this.collection, id)
    } catch (err) {
      console.log(err)
    }
  }

  async fetchDebts() {
    const debtStore = useDebtStore()
    const authStore = useAuthStore()

    try {
      const response = await database.listDocuments(
        this.db,
        this.collection,
        [Query.equal('userId', authStore.authUser.$id)] // Query to fetch documents related to the logged-in user
      )

      debtStore.debts = response.documents
    } catch (err) {
      console.log(err)
    }
  }

  async updateDebt(id: number | string, fields: Partial<DebtModel>) {
    let error = null

    // getDebtById returns $databaseId, $collectionId etc
    // but this method does not accept those because row does not contain such props
    const strippedFields = this.stripUnnecessaryFields(fields, defaultDebt())

    try {
      await database.updateDocument(this.db, this.collection, id, strippedFields)
    } catch (err) {
      error = err
    }

    return {
      error
    }
  }

  async deleteDebt(id: number) {
    let error = null
    try {
      return await database.deleteDocument(this.db, this.collection, id)
    } catch (err) {
      error = err
    }

    return error
  }
}

export default new DebtService()
