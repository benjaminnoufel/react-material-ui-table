# contributing

## Requirements

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [GNU/Make](https://www.gnu.org/software/make/)

## Installation

```console
$ git clone git@github.com:benjaminnoufel/react-material-ui-table.git
```

## Environment setup

```console
$ cp .env.example .env
```

## Dependencies installation

```console
$ make install
```

## Lint

```console
$ make lint
```

## Test

```console
$ make test
```

## Build

```console
$ make build
```

## Token

```console
$ sed -i "s/NPM_AUTH_TOKEN=.*/NPM_AUTH_TOKEN=123abc/g" .env
$ make token
```

Where `123abc` is your NPM authentication token.

## Publish

```console
$ make publish
```
