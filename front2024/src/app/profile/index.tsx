import { memo } from 'react'
import useStore from '@src/hooks/use-store'
import useSelector from '@src/hooks/use-selector'
import useTranslate from '@src/hooks/use-translate'
import useInit from '@src/hooks/use-init'
import PageLayout from '@src/components/page-layout'
import Head from '@src/components/head'
import Navigation from '@src/containers/navigation'
import Spinner from '@src/components/spinner'
import LocaleSelect from '@src/containers/locale-select'
import TopHead from '@src/containers/top-head'
import ProfileCard from '@src/components/profile-card'
import { StoreState } from '@src/store/types'

function Profile() {
  const store = useStore()

  useInit(() => {
    store.actions.profile.load()
  }, [])

  const select = useSelector((state: StoreState) => ({
    profile: state.profile.data as {
      profile: {
        name: string
        phone: string
      }
    },
    waiting: state.profile.waiting,
  }))

  const { t } = useTranslate()

  return (
    <PageLayout>
      <TopHead />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard data={select.profile} />
      </Spinner>
    </PageLayout>
  )
}

export default memo(Profile)
