import {afterEach} from "vitest"
import {cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"


//cleanup after each test
afterEach(()=>{
    cleanup()
})