USE banco_teste;

INSERT INTO
    `UserGroupTypes` (`Name`)
VALUES
    ('Root'),
    ('White Collar'),
    ('Blue Collar');

INSERT INTO
    `UserGroups` (`IdUserGroupType`, `Name`)
VALUES
    (1, 'Root'),
    (2, 'Admin'),
    (3, 'Operador');

-- SENHA PADRÃO: 123

INSERT INTO
    `Users` (
        `IdUserGroup`,
        `Name`,
        `Login`,
        `Password`
    )
VALUES
    (
        1,
        'Root',
        'root',
        '202cb962ac59075b964b07152d234b70'
    ),
    (
        2,
        'Admin',
        'admin',
        '202cb962ac59075b964b07152d234b70'
    ),
    (
        2,
        'Operador',
        'operador',
        '202cb962ac59075b964b07152d234b70'
    );