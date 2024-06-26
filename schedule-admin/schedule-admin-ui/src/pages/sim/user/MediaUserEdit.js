import { useLocation, useParams } from 'react-router-dom';
// @mui
import { Box, Container } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import ErrorOccur from '../../../components/ErrorOccur';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import useLocales from '../../../hooks/useLocales';
import UserEditForm from '../../../sections/schedule/user/UserEditForm';

// ----------------------------------------------------------------------

export default function MediaUserEdit() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { id } = useParams();

  const isEditRole = pathname.includes('role');
  const isEditEmail = pathname.includes('email');
  const isEditStatus = pathname.includes('status');
  const isEditPhone = pathname.includes('phone');
  const isEditInfo = pathname.includes('info');
  const isResetPassword = pathname.includes('password');
  const isView = pathname.includes('view');

  const { users, error } = useSelector((state) => state.mediaUser);
  const mediaUser = users.find(c => c.id === parseInt(id, 10));

  return (
    <Page title={mediaUser?.name}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={`${mediaUser?.name}`}
          links={[
            { name: translate('menu.dashboard'), href: PATH_DASHBOARD.root },
            {
              name: translate('menu.schedule'),
              href: PATH_DASHBOARD.schedule.root,
            },
            {
              name: translate('menu.user'),
              href: PATH_DASHBOARD.schedule.users,
            },
            { name: mediaUser?.name || '' },
          ]}
        />
        {error ? (
          <Box sx={{ py: 3 }}>
            <ErrorOccur error={error} />
          </Box>
        ) :
          <UserEditForm currentUser={mediaUser} isEditRole={isEditRole}
            isEditEmail={isEditEmail} isEditPhone={isEditPhone} isEditInfo={isEditInfo} isResetPassword={isResetPassword} isEditStatus={isEditStatus} isView={isView} />
        }
      </Container>
    </Page>
  );
}
