import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  AdminRemoveUserFromGroupCommand,
} from '@aws-sdk/client-cognito-identity-provider';

/*
  Steps to implement this service:
  1.Inject this service into your application wherever group management functionality is needed.
  2.Use the `addUserToGroup` method to assign users to a group.
  3.Use the `removeUserFromGroup` method to remove users from a group.
*/
@Injectable()
export class CognitoGroupService {
  private readonly cognitoClient: CognitoIdentityProviderClient;
  private readonly userPoolId?: string;

  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: process.env.COGNITO_REGION, 
    });
    this.userPoolId = process.env.COGNITO_USER_POOL_ID;
  }
  
  //Initialize the Cognito client and set the user pool ID from environment variables
  /**
   * Add a user to a Cognito group
   * @param username - The username of the user to be added
   * @param groupName - The name of the Cognito group
   * @throws InternalServerErrorException if the operation fails
   */
  async addUserToGroup(username: string, groupName: string): Promise<void> {
    const command = new AdminAddUserToGroupCommand({
      UserPoolId: this.userPoolId,
      Username: username,
      GroupName: groupName,
    });
    try {
      await this.cognitoClient.send(command);
      console.log(`Successfully added user ${username} to group ${groupName}`);
    } catch (error) {
      console.error('Failed to add user to group:', error);
      throw new InternalServerErrorException('cannot add user to group');
    }
  }
  /**
   * Remove a user from a Cognito group
   * @param username - The username of the user to be removed
   * @param groupName - The name of the Cognito group
   * @throws InternalServerErrorException if the operation fails
   */
  async removeUserFromGroup(username: string, groupName: string): Promise<void> {
    try {
      const command = new AdminRemoveUserFromGroupCommand({
        UserPoolId: this.userPoolId,
        Username: username,
        GroupName: groupName,
      });
      await this.cognitoClient.send(command);
      console.log(`removed user ${username} from group ${groupName} successfully`);
    } catch (error) {
      console.error('remove user failed: ', error);
      throw new InternalServerErrorException('cannot remove user from group');
    }
  }
}
