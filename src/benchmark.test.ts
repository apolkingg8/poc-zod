import {z} from "zod";

// around 50ms
test('benchmark-1 10k success', ()=> {
    const schema = z.object({
        prop1: z.string(),
        prop2: z.number(),
        prop3: z.object({
            prop1: z.string(),
            prop2: z.number(),
        }),
    })
    const dumbs = []

    for(let i=0; i<10000; i++) {
        dumbs.push({
            prop1: `${i}`,
            prop2: i,
            prop3: {
                prop1: `${i}`,
                prop2: i,
            }
        })
    }

    const st = Date.now()

    for(let i=0; i<dumbs.length; i++) {
        schema.parse(dumbs[i])
    }

    const end = Date.now()
    console.log(`Cost: ${end-st} ms`)
})

// around 150ms
test('benchmark-2 10k with 50% fail rate', ()=> {
    const schema = z.object({
        prop1: z.string(),
        prop2: z.number(),
        prop3: z.object({
            prop1: z.string(),
            prop2: z.number(),
        }),
    })
    const dumbs = []

    for(let i=0; i<10000; i++) {
        if(Math.random() > 0.5) {
            dumbs.push({
                prop1: `${i}`,
                prop2: i,
                prop3: {
                    prop1: `${i}`,
                    prop2: i,
                }
            })
        } else {
            dumbs.push({
                prop1: 123,
                prop2: `yo`,
                prop3: {
                    prop1: 123,
                    prop2: `yo`,
                }
            })
        }
    }

    const st = Date.now()

    for(let i=0; i<dumbs.length; i++) {
        try {
            schema.parse(dumbs[i])
        } catch (err) {

        }
    }

    const end = Date.now()
    console.log(`Cost: ${end-st} ms`)
})

export {}
