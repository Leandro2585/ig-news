import { render, screen, RenderResult } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { mocked } from 'ts-jest/utils'
import { SignButton } from '../../../src/application/components/sign-button'

jest.mock('next-auth/react')

const makeSUT = (): RenderResult => {
  return render(
    <SignButton />
  )
}

describe('Sign Button Component', () => {
  let useSessionMocked
  beforeAll(() => {
    useSessionMocked = mocked(useSession).mockReturnValue({ 
      data: { 
        user: { 
          name: 'John Doe', 
          email: 'john.doe@example.com'
        },
        expires: 'fake-expires'
      }, 
      status: 'authenticated' 
    })
  })
  
  test('renders correctly when user is authenticated', () => {
    makeSUT()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  test('renders correctly when user is not authenticated', async () => {
    await useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' })
    makeSUT()
    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument()
  })
})