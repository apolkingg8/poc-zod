import {z} from "zod";

test('basic', ()=> {
    const s = z.number()
    expect(()=> {s.parse(123)}).not.toThrow()
    expect(()=> {s.parse('123')}).toThrow()
    expect(()=> {s.parse(undefined)}).toThrow()
    expect(()=> {s.parse(null)}).toThrow()
})

test('nested', ()=> {

})

test('complex', ()=> {

})

test('performance', ()=> {

})

export {}
