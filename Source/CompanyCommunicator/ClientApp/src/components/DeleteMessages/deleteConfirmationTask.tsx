// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Button, Caption1Stronger, Text, Title2 } from '@fluentui/react-components';
import { dialog } from '@microsoft/teams-js';
import { deleteMessages } from '../../apis/messageListApi';
import { useAppDispatch } from '../../store';
import { GetDeletedMessagesSilentAction } from '../../actions';
import { IDeleteMessageRequest } from '../../models/deletedMessages';

export const DeleteConfirmationTask = () => {
  const { deletionType, deletionFromDate, deletionToDate } = useParams() as any;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onBack = () => {
    dialog.url.submit();
  };

  const onDelete = () => {
    let fromDate: Date = new Date();
    let toDate: Date = new Date();

    if (deletionType.toLowerCase() === 'customdate') {
      fromDate = new Date(deletionFromDate);
      toDate = new Date(deletionToDate);
    } else if (deletionType.toLowerCase() === 'last30Days') {
      fromDate = new Date(new Date().getDate() - 30);
    } else if (deletionType.toLowerCase() === 'last3Months') {
      fromDate = new Date(new Date().getDate() - 90);
    } else if (deletionType.toLowerCase() === 'last6Months') {
      fromDate = new Date(new Date().getDate() - 180);
    } else if (deletionType.toLowerCase() === 'last1year') {
      fromDate = new Date(new Date().getDate() - 365);
    }

    const payload: IDeleteMessageRequest = { selectedDateRange: deletionType, startDate: fromDate, endDate: toDate };

    void deleteMessages(payload).then(() => {
      GetDeletedMessagesSilentAction(dispatch);
      dialog.url.submit();
    });
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
