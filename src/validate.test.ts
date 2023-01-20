import {z} from "zod";

test('basic', ()=> {
    const s = z.number()
    expect(()=> {s.parse(123)}).not.toThrow()
    expect(()=> {s.parse('123')}).toThrow()
    expect(()=> {s.parse(undefined)}).toThrow()
    expect(()=> {s.parse(null)}).toThrow()
})

test('nested', ()=> {
    const schema = z.object({
        prop1: z.string(),
        prop2: z.number(),
        prop3: z.object({
            prop1: z.string(),
            prop2: z.number(),
        }),
    })
    expect(()=> {schema.parse({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })}).not.toThrow()
    expect(()=> {schema.parse({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
        }
    })}).toThrow()
    expect(()=> {schema.parse({
        prop1: '123',
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })}).toThrow()
    expect(()=> {schema.parse({
        prop1: '123',
        prop2: 123,
        iShouldNotHere: 'no',
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })}).not.toThrow()
    expect(()=> {schema.strict().parse({
        prop1: '123',
        prop2: 123,
        iShouldNotHere: 'no',
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })}).toThrow()
    expect(schema.parse({
        prop1: '123',
        prop2: 123,
        iShouldNotHere: 'no',
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })).toEqual({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })
    expect(()=> {schema.parse({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
            prop2: 123,
            iShouldNotHere: 'no',
        }
    })}).not.toThrow()
    // should have a deepStrict()
    // https://github.com/colinhacks/zod/issues/1370
    /*expect(()=> {s.strict().parse({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
            prop2: 123,
            iShouldNotHere: 'no',
        }
    })}).toThrow()*/
    expect(schema.parse({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
            prop2: 123,
            iShouldNotHere: 'no',
        }
    })).toEqual({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })
    expect(()=> {schema.parse({
        prop1: '123',
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })}).toThrow()
    expect(()=> {schema.parse({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
        }
    })}).toThrow()
    expect(()=> {schema.parse({
        prop1: '123',
        prop2: '123',
        prop3: {
            prop1: '123',
            prop2: 123,
        }
    })}).toThrow()
    expect(()=> {schema.parse({
        prop1: '123',
        prop2: 123,
        prop3: {
            prop1: '123',
            prop2: '123',
        }
    })}).toThrow()
    expect(()=> {schema.parse({
        prop1: '123',
        prop2: 123,
        prop3: 'no',
    })}).toThrow()
})

export {}
