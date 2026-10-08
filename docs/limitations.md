# Known Limitations

- **Cross-Contract Resolution Rate**: Statically resolving dynamic dispatches or cross-contract calls often yields a partial mapping. Many targets are passed at runtime (e.g., `Address` arguments), resulting in legitimately unresolved (`resolved: false`) edges in the AST. 
