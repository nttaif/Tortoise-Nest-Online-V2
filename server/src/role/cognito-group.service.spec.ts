import { CognitoGroupService } from './cognito.group.service';
import {
  AdminAddUserToGroupCommand,
  AdminRemoveUserFromGroupCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { InternalServerErrorException } from '@nestjs/common';

jest.mock('@aws-sdk/client-cognito-identity-provider', () => {
  const mockSend = jest.fn();
  return {
    CognitoIdentityProviderClient: jest.fn(() => ({ send: mockSend })),
    AdminAddUserToGroupCommand: jest.fn(),
    AdminRemoveUserFromGroupCommand: jest.fn(),
  };
});

describe('CognitoGroupService', () => {
  let service: CognitoGroupService;
  let mockSend: jest.Mock;

  beforeEach(() => {
    service = new CognitoGroupService();
    mockSend = (service as any).cognitoClient.send as jest.Mock;
    jest.clearAllMocks();
  });

  describe('addUserToGroup', () => {
    it('should successfully add a user to a group', async () => {
      mockSend.mockResolvedValueOnce({});
      await expect(service.addUserToGroup('dev', 'org-admin')).resolves.not.toThrow();
      expect(AdminAddUserToGroupCommand).toHaveBeenCalledWith({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: 'dev',
        GroupName: 'org-admin',
      });
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    it('should throw InternalServerErrorException if adding a user to group fails', async () => {
      mockSend.mockRejectedValueOnce(new Error('AWS Error'));
      await expect(service.addUserToGroup('dev', 'org-admin')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('removeUserFromGroup', () => {
    it('should successfully remove a user from a group', async () => {
      mockSend.mockResolvedValueOnce({});
      await expect(service.removeUserFromGroup('dev', 'org-admin')).resolves.not.toThrow();
      expect(AdminRemoveUserFromGroupCommand).toHaveBeenCalledWith({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: 'dev',
        GroupName: 'org-admin',
      });
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    it('should throw InternalServerErrorException if removing a user from group fails', async () => {
      mockSend.mockRejectedValueOnce(new Error('AWS Error'));
      await expect(service.removeUserFromGroup('dev', 'org-admin')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
