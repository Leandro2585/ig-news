import { render, screen, RenderResult } from '@testing-library/react'
import { SignButton } from '../../../src/application/components/sign-button'

jest.mock('next-auth/react', () => ({ useSession() { return { data: null, status: 'unauthenticated' }}}))

const makeSUT = (): RenderResult => {
  return render(
    <SignButton />
  )
}

describe('Sign Button Component', () => {
  beforeAll(() => {
  })

  beforeEach(() => {
    makeSUT()
  })

  test('renders correctly when user is not authenticated', () => {
    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument()
  })
})