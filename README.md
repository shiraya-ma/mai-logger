# MaiLogger

MaiLogger is a flexible and easy-to-use logging module for JavaScript applications. It provides output in the format `[LOG_LEVEL] yyyy/mm/dd HH:MM:SS messages` by default.

## Features

- Customizable log levels (TRACE, DEBUG, INFO, WARN, ERROR)
- Locale support for date and time formatting
- Color-coded log output for both browser and Node.js environments

## Installation

Install the module via npm:

```bash
npm i @shirayama-mai/mai-logger
```

## Usage

Import and create an instance of MaiLogger:

```javascript
import { MaiLogger } from '@shirayama-mai/mai-logger';

const log = new MaiLogger({ level: 0, locale: 'ja-JP' });
// or const log = new MaiLogger({ level: 'TRACE', locale: 'ja-JP' });

log.trace('hello world!', 'this is MaiLogger');
```

This will output:

```bash
[TRACE] 2024/05/23 17:00:00 hello world! this is MaiLogger
```

## API

### Constructor

```typescript
constructor(option?: MaiLogger.ConstructorOption)
```

#### ConstructorOption

| Option | Type | Default | Description |
| :-: | :-: | :-: | :- |
| level | number \| LogLevel | `"INFO"` | The most detailed log level to output. |
| locale | Intl.LocalesArgument | `"ja-JP"` | Locale to which the date and time displayed in the log conform. |

### Log Levels

| Log Level | Description |
| :-: | :- |
| `TRACE` | Most detailed information, typically of interest only when diagnosing problems. |
| `DEBUG` | Detailed information on the flow through the system. |
| `INFO` | Interesting runtime events (startup/shutdown). |
| `WARN` | Use of deprecated APIs, poor use of API, 'almost' errors, other runtime  |situations that are undesirable or unexpected, but not necessarily wrong.
| `ERROR` | Other runtime errors or unexpected conditions. |

### Methods

```typescript
trace(...message: any)
```
Outputs trace level logs.

```typescript
debug(...message: any)
```
Outputs debug level logs.

```typescript
info(...message: any)
```
Outputs info level logs.

```typescript
warn(...message: any)
```
Outputs warning level logs.

```typescript
error(...message: any)
```
Outputs error level logs.

## Examples

### Basic Usage
```javascript
import { MaiLogger } from '@shirayama-mai/mai-logger';

const log = new MaiLogger({ level: 'DEBUG' });
// or const log = new MaiLogger({ level: 1 });

log.debug('This is a debug message');
log.info('This is an info message');
log.warn('This is a warning message');
log.error('This is an error message');
```

### Advanced Usage
```javascript
import { MaiLogger } from '@shirayama-mai/mai-logger';

const log = new MaiLogger({ level: 'DEBUG' });
// or const log = new MaiLogger({ level: 1 });

log.trace('Trace message will not be shown');
log.debug('This is a debug message');
log.info('This is an info message');
log.warn('This is a warning message');
log.error('This is an error message');
```

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
