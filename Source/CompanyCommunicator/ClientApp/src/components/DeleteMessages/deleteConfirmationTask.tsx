// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Text, Button, Caption1Stronger, Title2 } from '@fluentui/react-components';
import { useTranslation } from 'react-i18next';
import { ROUTE_PARTS } from '../../routes';

export const DeleteConfirmationTask = () => {
  const { deletionType, deletionFromDate, deletionToDate } = useParams() as any;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onBack = () => {
    navigate(`/${ROUTE_PARTS.DELETE_MESSAGES}`);
  };

  const onDelete = () => {
    // Placeholder
    navigate(`/${ROUTE_PARTS.DELETE_MESSAGES}`);
  };

  return (
    <div className='delete-confirmation-task'>
      <Title2>{t('deleteTheMessages')}</Title2>
      <br />
      <br />
      <Caption1Stronger>{t('dateRange')}</Caption1Stronger>
      <br />
      {deletionType.toLowerCase() === 'last30days' && <Text>{t('last30Days')}</Text>}
      {deletionType.toLowerCase() === 'last3months' && <Text>{t('last3Months')}</Text>}
      {deletionType.toLowerCase() === 'last6months' && <Text>{t('last6Months')}</Text>}
      {deletionType.toLowerCase() === 'last1year' && <Text>{t('last1Year')}</Text>}
      {deletionType.toLowerCase() === 'customdate' && (
        <Text>
          {t('from')}&nbsp;{deletionFromDate}&nbsp;{t('to')}&nbsp;{deletionToDate}
        </Text>
      )}
      <br />
      <br />
      <Text className='info-text'>{t('deleteConfirmationNote')}</Text>
      <br />
      <br />
      <div className='fixed-footer'>
        <div className='footer-action-right'>
          <div className='footer-actions-flex'>
            <Button onClick={onBack} style={{ marginLeft: '16px' }} appearance='secondary'>
              {t('Back')}
            </Button>
            <Button onClick={onDelete} style={{ marginLeft: '16px' }} appearance='primary'>
              {t('delete')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
