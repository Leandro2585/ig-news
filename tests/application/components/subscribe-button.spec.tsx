import { render, screen, fireEvent } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/react'
import { mocked } from 'ts-jest/utils'
import { useRouter } from 'next/router'
import { SubscribeButton } from '../../../src/application/components/subscribe-button'

jest.mock('next-auth/react')
jest.mock('next/router')

const makeSUT = () => {
  return render(<SubscribeButton/>)
}

describe('Subscribe Button', () => {
  let signInMocked: jest.Mock
  let useRouterMocked: jest.Mock
  let pushMock: jest.Mock
  let useSessionMocked: jest.Mock
  beforeAll(() => {
    pushMock = jest.fn()
    signInMocked = mocked(signIn)
    useRouterMocked = mocked(useRouter)
    useSessionMocked = mocked(useSession).mockReturnValue({ data: null, status: 'unauthenticated' })
  })

  test('renders correctly', () => {
    makeSUT()
    
    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  test('redirect user to sign in when not authenticated', () => {
    makeSUT()
    
    const subscribeButton = screen.getByText('Subscribe now')
    fireEvent.click(subscribeButton)
    expect(signInMocked).toHaveBeenCalled()
  })
})