import { render, RenderResult, screen } from '@testing-library/react'
import Home from '../../../src/pages/index'

jest.mock('next/router')
jest.mock('next-auth/react', () => ({ useSession() { return { data: null, status: 'unauthenticated' }}}))


const makeSUT = (): RenderResult => {
  return render(<Home product={{ priceId: 'fake-price-id', amount: 'R$10,00' }}/>)
}

describe('Home Page', () => {
  test('renders correctly', () => {
    makeSUT()

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument()
  })
})