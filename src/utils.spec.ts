import { entriesNotIn, objectByString, reorderFromObject } from './utils'

describe('test utils for Components', (): void => {
  describe('test entriesNotIn', (): void => {
    it('should be test entriesNotIn return header without filter', () => {
      expect.assertions(1)
      const headers: Record<string, string> = { name: 'Nom', description: 'Description' }
      const data = Object.entries(headers)
        .filter(entriesNotIn(['a']))
        .map(([, headerCell]: [string, string]) => headerCell)
      expect(data).toStrictEqual(['Nom', 'Description'])
    })

    it('should be test entriesNotIn return header with filter', () => {
      expect.assertions(1)
      const headers: Record<string, string> = {
        name: 'Nom',
        description: 'Description',
        filter: 'ToFilter',
      }
      const data = Object.entries(headers)
        .filter(entriesNotIn(['filter']))
        .map(([, headerCell]: [string, string]) => headerCell)
      expect(data).toStrictEqual(['Nom', 'Description'])
    })
  })

  describe('test reorderFromObject', (): void => {
    it('should be have no entries', () => {
      expect.assertions(2)
      const headers: Record<string, string> = {}
      const row = { name: 'Product 1', description: 'Description of product one' }
      const data = Object.entries(reorderFromObject(headers, row))
      expect(data).toHaveLength(0)
      expect(data).toStrictEqual([])
    })

    it("should be have entries but don't have value", () => {
      expect.assertions(10)
      const headers: Record<string, string> = {
        name: 'Nom',
        description: 'Description',
        filter: 'ToFilter',
      }
      const row = {}
      const data = Object.entries(reorderFromObject(headers, row))
      expect(data).toHaveLength(3)
      expect(data[0]).toHaveLength(2)
      expect(data[0][0]).toStrictEqual('name')
      expect(data[0][1]).toBeUndefined()

      expect(data[1]).toHaveLength(2)
      expect(data[1][0]).toStrictEqual('description')
      expect(data[1][1]).toBeUndefined()

      expect(data[2]).toHaveLength(2)
      expect(data[2][0]).toStrictEqual('filter')
      expect(data[2][1]).toBeUndefined()
    })

    it('should be have a valid entries', () => {
      expect.assertions(10)
      const headers: Record<string, string> = {
        name: 'Nom',
        description: 'Description',
        filter: 'ToFilter',
      }
      const row = { name: 'Product 1', description: 'Description of product one' }
      const data = Object.entries(reorderFromObject(headers, row))
      expect(data).toHaveLength(3)
      expect(data[0]).toHaveLength(2)
      expect(data[0][0]).toStrictEqual('name')
      expect(data[0][1]).toStrictEqual('Product 1')

      expect(data[1]).toHaveLength(2)
      expect(data[1][0]).toStrictEqual('description')
      expect(data[1][1]).toStrictEqual('Description of product one')

      expect(data[2]).toHaveLength(2)
      expect(data[2][0]).toStrictEqual('filter')
      expect(data[2][1]).toBeUndefined()
    })
  })

  describe('test objectByString', (): void => {
    it('should be have a result without search', () => {
      expect.assertions(5)
      const rows = [
        { name: 'Product 1', description: 'Description of product one' },
        { name: 'Product 2', description: 'Description of product two' },
      ]
      const data = rows.filter(objectByString(null))
      expect(data).toHaveLength(2)

      expect(data[0].name).toStrictEqual('Product 1')
      expect(data[0].description).toStrictEqual('Description of product one')

      expect(data[1].name).toStrictEqual('Product 2')
      expect(data[1].description).toStrictEqual('Description of product two')
    })

    it('should be have a result with search', () => {
      expect.assertions(3)
      const rows = [
        { name: 'Product 1', description: 'Description of product one' },
        { name: 'Product 2', description: 'Description of product two' },
      ]
      const data = rows.filter(objectByString('two'))
      expect(data).toHaveLength(1)
      expect(data[0].name).toStrictEqual('Product 2')
      expect(data[0].description).toStrictEqual('Description of product two')
    })
  })
})
