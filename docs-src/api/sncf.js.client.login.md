<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [sncf.js](./sncf.js.md) &gt; [Client](./sncf.js.client.md) &gt; [login](./sncf.js.client.login.md)

## Client.login() method

Logs the client in, establishing a connection to navitia.

**Signature:**

```typescript
login(token?: string): Promise<Client>;
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

token


</td><td>

string


</td><td>

_(Optional)_ the token of the account to log in with


</td></tr>
</tbody></table>
**Returns:**

Promise&lt;[Client](./sncf.js.client.md)<!-- -->&gt;

## Example 1

Login using a token

```javascript
login('YOUR_TOKEN');
```

## Example 2

Login using a token from the environment variable (SNCF\_TOKEN) The token in environment variable is automatically used if no token is provided, but it must be named SNCF\_TOKEN

```javascript
login();
```

