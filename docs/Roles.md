# Roles

> This is currently a working document for developing the roles system.

Holenav combines roles and folders to implement access control.

## Folder Roles

Folder roles describe the rights a specific user has to a specific folder. By default, users have no access to a newly created folder. Access can be granted either by corporation/alliance membership or by assigning roles to specific users.

Each role inherits the rights of previous roles.

### `READ`

- Read folder data.

### `WRITE`

- Create, edit and delete folder data (i.e., signatures, intel, etc. in the folder).

### `MANAGE`

- Manage folder access.

### `ADMIN`

- Delete folder.
- Edit folder name.

## System Roles

Each user has exactly one role that is not related to any folder – _the system role_. These are used to control who can log in and to grant global administrative privileges.

Each role inherits the rights of previous roles.

### `SOLDIER`

- Log in.
- Edit personal settings.
- Use mapper in the folders they have access to.

### `CAPTAIN`

- Manage all users with the `SOLDIER` role.

### `DIRECTOR`

The highest level role. Can be used as a traditional "superuser" or granted to multiple users in more trusting communities. The last remaining `DIRECTOR` cannot revoke this role or delete their account. The first user to register is granted this role.

- Manage app settings.
- Manage all users. This includes other users with the `DIRECTOR` role, as well as granting and revoking the `DIRECTOR` role.
