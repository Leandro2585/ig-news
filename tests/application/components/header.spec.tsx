import { render, screen, RenderResult } from '@testing-library/react'
import { Header } from '../../../src/application/components/header'

jest.mock('next/router', () => ({ useRouter() { return { asPath: '/' } } }))
jest.mock('next-auth/react', () => ({ useSession() { return { data: null, status: 'unauthenticated' }}}))
// const nextAuthMocked = mocked(useSession)

const makeSUT = (): RenderResult => {
  return render(
    <Header />
  )
}

describe('Header Component', () => {
  beforeAll(() => {
  })

  beforeEach(() => {
    makeSUT()
  })

  test('renders correctly', () => {
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Posts')).toBeInTheDocument()
  })
})